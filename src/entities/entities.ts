import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Token as TokenContract } from "../../generated/Token/Token";
import { Project, Account, Bonsai } from "../../generated/schema";
import { ipfs, json, JSONValue } from '@graphprotocol/graph-ts';
import { ZERO, IPFS_HASH } from "../utils/constants";

/***** Project functions *****/
export function getProject(contractAddress: Address): Project {
  let project = Project.load(contractAddress.toHexString());
  if (!project) {
    let tokenContract = TokenContract.bind(contractAddress);
    project = new Project(contractAddress.toHexString());
    project.name = tokenContract.name();
    project.symbol = tokenContract.symbol();
    project.totalMinted = ZERO;
    project.totalSales = ZERO;
    project.totalTransfers = ZERO;
    project.totalSalesWei = ZERO;
    project.avgSaleWei = ZERO;
    project.buyers = [];
    project.sellers = [];
    project.save();
  }
  return project as Project;
}

// appends a buyer to project.buyers array if it doesn't exist
export function addBuyer(project: Project, buyer: Account): void {
  let buyers = project.buyers;
  if (!buyers.includes(buyer.id)) {
    buyers.push(buyer.id);
    project.buyers = buyers;
  }
  project.save();
}

// appends a seller to project.sellers array if it doesn't exist
export function addSeller(project: Project, seller: Account): void {
  let sellers = project.buyers;
  if (!sellers.includes(seller.id)) {
    sellers.push(seller.id);
    project.sellers = sellers;
  }
  project.save();
}


/***** Account functions *****/
export function getAccount(walletAddress: Address): Account {
  let account = Account.load(walletAddress.toHexString());
  if (!account) {
    account = new Account(walletAddress.toHexString());
    account.totalSales = ZERO;
    account.totalTransfers = ZERO;
  }
  account.save();

  return account as Account;
}

/***** NFT functions *****/
export function getBonsai(
  id: string,
  contractAddress: Address,
  tokenID: BigInt,
  timestamp: BigInt,
  walletAddress: Address
): Bonsai {
  let bonsai = Bonsai.load(id);
  if (!bonsai) {
    bonsai = new Bonsai(id);
    bonsai.project = contractAddress.toHexString();
    bonsai.tokenID = tokenID;
    bonsai.timestamp = timestamp;
    bonsai.tokenURI = IPFS_HASH + "/" + tokenID.toString();
  
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
  bonsai.account = walletAddress.toHexString();
  bonsai.save();

  return bonsai as Bonsai;
}
