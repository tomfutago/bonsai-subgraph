import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Bonsai } from "../../generated/schema";
import { ipfs, json, JSONValue } from '@graphprotocol/graph-ts';
import { ZERO, IPFS_HASH } from "../utils/constants";

/***** NFT functions *****/
export function get(
  id: string,
  contractAddress: Address,
  tokenID: BigInt,
  block: BigInt,
  hash: Bytes,
  timestamp: BigInt,
  walletAddress: Address
): Bonsai {
  let bonsai = Bonsai.load(id);
  if (!bonsai) {
    bonsai = new Bonsai(id);
    bonsai.project = contractAddress.toHexString();
    bonsai.account = walletAddress.toHexString();
    bonsai.tokenID = tokenID;
    bonsai.block = block;
    bonsai.hash = hash;
    bonsai.timestamp = timestamp;
    
    bonsai.totalSales = ZERO;
    bonsai.totalSalesWei = ZERO;
    bonsai.avgSaleWei = ZERO;
    bonsai.totalTransfers = ZERO;
  
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
    bonsai.save();
  }
  return bonsai as Bonsai;
}
