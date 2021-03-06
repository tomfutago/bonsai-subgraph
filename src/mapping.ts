import { Transfer as TransferEvent } from "../generated/Token/Token";
import { Bonsai, Project } from "../generated/schema";
import { ZERO, ZERO_ADDRESS } from "./utils/constants";
import * as projects from "./entities/projects";
import * as accounts from "./entities/accounts";
import * as nfts from "./entities/nfts";
import * as saleEvents from "./entities/saleEvents";
import * as transferEvents from "./entities/transferEvents";

export function handleTransfer(event: TransferEvent): void {
  /***** get Event details *****/
  let address = event.address;
  let tokenId = event.params.tokenId;
  let from = event.params.from;
  let to = event.params.to;
  let amount = event.transaction.value;
  let block = event.block.number;
  let hash = event.transaction.hash;
  let timestamp = event.block.timestamp;

  /***** Project *****/
  let project = projects.get(address);
  // sale
  if (from.toHexString() != ZERO_ADDRESS) {
    let seller = accounts.get(from);
    let buyer = accounts.get(to);
    projects.addSeller(project as Project, seller);
    projects.addBuyer(project as Project, buyer);
  }
  project.save();

  /***** Account *****/
  let fromAccount = accounts.get(from);
  let toAccount = accounts.get(to);
  
  /***** NFT *****/
  let bonsai = nfts.get(
    tokenId.toString(),
    address,
    tokenId,
    block,
    hash,
    timestamp,
    to
  );

  /***** Sale Event *****/
  if (from.toHexString() != ZERO_ADDRESS && amount.gt(ZERO)) {
    saleEvents.create(
      bonsai as Bonsai,
      project as Project,
      fromAccount,
      toAccount,
      amount,
      block,
      hash,
      timestamp
    );
  }

  /***** Transfer Event *****/
  transferEvents.create(
    bonsai as Bonsai,
    project as Project,
    fromAccount,
    toAccount,
    block,
    hash,
    timestamp
  );
}
