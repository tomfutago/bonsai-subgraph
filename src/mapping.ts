import { Transfer as TransferEvent } from "../generated/Token/Token";
import { store } from '@graphprotocol/graph-ts';
import { ONE, ZERO_ADDRESS } from "./utils/constants";
import * as entities from "./entities/entities";

export function handleTransfer(event: TransferEvent): void {
  let project = entities.getProject(event.address);
  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    project.totalMinted = project.totalMinted.plus(ONE);
  }
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    project.totalSales = project.totalSales.plus(ONE);
  }
  project.totalTransfers = project.totalTransfers.plus(ONE);
  project.save();
  
  let bonsai = entities.getBonsai(
    event.params.tokenId.toString(),
    event.address,
    event.params.tokenId,
    event.block.timestamp,
    event.params.to
  );

  // check if current account exists in the store, if not - add account
  let account = entities.getAccount(event.params.to);
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    account.totalSales = account.totalSales.plus(ONE);
  }
  account.totalTransfers = account.totalTransfers.plus(ONE);
  account.save();

  // check if previous account has any other bonsai, if not - remove account
  //let prevAccount = Account.load(event.params.from.toHexString());
  //if (!prevAccount) return;
  //if (!prevAccount.bonsai) {
  //  let id = prevAccount.id;
  //  store.remove("Account", id);
  //}
}
