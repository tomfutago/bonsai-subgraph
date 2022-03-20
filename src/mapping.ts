import {
  Transfer as TransferEvent,
  Token as TokenContract
} from "../generated/Token/Token"
import {
  Project, Account, Bonsai
} from "../generated/schema"
import { store, ipfs, json, JSONValue } from '@graphprotocol/graph-ts'
import { ZERO, ONE, ZERO_ADDRESS } from "../utils/constants"

export function handleTransfer(event: TransferEvent): void {
  let project = Project.load(event.address.toHexString());
  if (!project) {
    let tokenContract = TokenContract.bind(event.address);
    project = new Project(event.address.toHexString());
    project.name = tokenContract.name();
    project.symbol = tokenContract.symbol();
    project.totalMinted = ZERO;
    project.totalSales = ZERO;
    project.totalTransfers = ZERO;
  }
  if (event.params.from.toHexString() == ZERO_ADDRESS) {
    project.totalMinted = project.totalMinted.plus(ONE);
  }
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    project.totalSales = project.totalSales.plus(ONE);
  }
  project.totalTransfers = project.totalTransfers.plus(ONE);
  project.save();
  
  let bonsai = Bonsai.load(event.params.tokenId.toString());
  if (!bonsai) {
    bonsai = new Bonsai(event.params.tokenId.toString());
    bonsai.project = event.address.toHexString();
    bonsai.tokenID = event.params.tokenId;
    bonsai.createdAtTimestamp = event.block.timestamp

    //let tokenContract = TokenContract.bind(event.address)
    //bonsai.tokenURI = tokenContract.tokenURI(event.params.tokenId);
    const ipfsHash = "QmVtJUJrjWfthrGFvkwFciZcvoNLzCrC6EXAQwimYBUZeQ"
    bonsai.tokenURI = ipfsHash + "/" + event.params.tokenId.toString();

    let metadata = ipfs.cat(bonsai.tokenURI);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const name = value.get("name");
        if (name) {
          bonsai.name = name.toString();
        }

        const image = value.get("image");
        if (image) {
          bonsai.image = image.toString();
        }

        const animation_url = value.get("animation_url");
        if (animation_url) {
          bonsai.animation_url = animation_url.toString();
        }
      }

      let attributes: JSONValue[];
      let bonsaiAttributes = value.get("attributes");
      if (bonsaiAttributes) {
        attributes = bonsaiAttributes.toArray();

        for (let i=0; i<attributes.length; i++) {
          let item = attributes[i].toObject();
          let trait: string;
          let traitName = item.get("trait_type");
          if (traitName) {
            trait = traitName.toString();
            let value: string;
            let traitValue = item.get("value");
            if (traitValue) {
              value = traitValue.toString();
              if (trait == "Pot") {
                bonsai.pot = value;
              }
              if (trait == "Pet") {
                bonsai.pet = value;
              }
              if (trait == "Bark") {
                bonsai.bark = value;
              }
              if (trait == "Leaves") {
                bonsai.leaves = value;
              }
              if (trait == "Fruit") {
                bonsai.fruit = value;
              }
              if (trait == "Number of fruit") {
                bonsai.numberOfFruit = value;
              }
              if (trait == "Ground cover") {
                bonsai.groundCover = value;
              }
              if (trait == "Background") {
                bonsai.background = value;
              }
            }
          }
        }
      }
    }
  }
  bonsai.account = event.params.to.toHexString();
  bonsai.save();

  // check if current account exists in the store, if not - add account
  let account = Account.load(event.params.to.toHexString());
  if (!account) {
    account = new Account(event.params.to.toHexString());
    account.totalSales = ZERO;
    account.totalTransfers = ZERO;
  }
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
