import { Transfer as TransferEvent } from "../generated/Token/Token";
import { store } from '@graphprotocol/graph-ts';
import { ONE, ZERO_ADDRESS } from "./utils/constants";
import * as entities from "./entities/entities";
import { Project } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  /***** get Event details *****/
  let address = event.address;
  let tokenId = event.params.tokenId;
  let from = event.params.from;
  let to = event.params.to;
  let timestamp = event.block.timestamp;

  /***** update Project *****/
  let project = entities.getProject(address);
  // mint
  if (from.toHexString() == ZERO_ADDRESS) {
    project.totalMinted = project.totalMinted.plus(ONE);
  }
  // sale
  if (from.toHexString() != ZERO_ADDRESS) {
    let seller = entities.getAccount(from);
    let buyer = entities.getAccount(to);
    project.totalSales = project.totalSales.plus(ONE);
    entities.addSeller(project as Project, seller);
    entities.addBuyer(project as Project, buyer);
  }
  // transfer
  project.totalTransfers = project.totalTransfers.plus(ONE);
  project.save();

  /***** update Account *****/
  let account = entities.getAccount(to);
  if (from.toHexString() != ZERO_ADDRESS) {
    account.totalSold = account.totalSold.plus(ONE);
  }
  //account.totalTransfers = account.totalTransfers.plus(ONE);
  account.save();

  // check if previous account has any other bonsai, if not - remove account
  //let prevAccount = Account.load(event.params.from.toHexString());
  //if (!prevAccount) return;
  //if (!prevAccount.bonsai) {
  //  let id = prevAccount.id;
  //  store.remove("Account", id);
  //}
  
  /***** update NFT *****/
  let bonsai = entities.getBonsai(
    tokenId.toString(),
    address,
    tokenId,
    timestamp,
    to
  );
}
