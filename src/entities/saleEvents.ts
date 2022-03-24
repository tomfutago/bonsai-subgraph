import { Project, Account, Bonsai, SaleEvent } from "../../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { ONE } from "../utils/constants";

export function create(
  nft: Bonsai,
  project: Project,
  from: Account,
  to: Account,
  amount: BigInt,
  block: BigInt,
  hash: Bytes,
  timestamp: BigInt
): void {
  // new sales event
  let saleId = nft.id
    .concat("/")
    .concat(nft.totalSales.toString());

  let sale = new SaleEvent(saleId);

  sale.idx = nft.totalSales;
  sale.project = project.id;
  sale.nft = nft.id;
  sale.amount = amount;
  sale.from = from.id;
  sale.to = to.id;
  sale.block = block;
  sale.hash = hash;
  sale.timestamp = timestamp;

  // increment the sales counts
  project.totalSales = project.totalSales.plus(ONE);
  nft.totalSales = nft.totalSales.plus(ONE);
  from.totalBought = from.totalBought.plus(ONE);
  to.totalSold = to.totalSold.plus(ONE);

  // increment the sales amounts
  project.totalSalesWei = project.totalSalesWei.plus(sale.amount);
  nft.totalSalesWei = nft.totalSalesWei.plus(sale.amount);
  from.totalBoughtWei = from.totalBoughtWei.plus(sale.amount);
  to.totalSoldWei = to.totalSoldWei.plus(sale.amount);

  // calculate average sale prices
  project.avgSaleWei = project.totalSalesWei.div(project.totalSales);
  nft.avgSaleWei = nft.totalSalesWei.div(nft.totalSales);
  from.avgBoughtWei = from.totalBoughtWei.div(from.totalBought);
  to.avgSoldWei = to.totalSoldWei.div(to.totalSold);

  // graph mutation
  project.save();
  from.save();
  to.save();
  nft.save();
  sale.save();
}
