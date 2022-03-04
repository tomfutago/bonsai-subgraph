import {
  Transfer as TransferEvent
} from "../generated/Token/Token"
import {
  Bonsai, Holder
} from "../generated/schema"
import { store, ipfs, json, JSONValue } from '@graphprotocol/graph-ts'

export function handleTransfer(event: TransferEvent): void {
  const ipfsHash = "QmVtJUJrjWfthrGFvkwFciZcvoNLzCrC6EXAQwimYBUZeQ"
  
  let bonsai = Bonsai.load(event.params.tokenId.toString());
  if (!bonsai) {
    bonsai = new Bonsai(event.params.tokenId.toString());
    bonsai.tokenID = event.params.tokenId;
    bonsai.createdAtTimestamp = event.block.timestamp
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
  bonsai.holder = event.params.to.toHexString();
  bonsai.save();

  // check if current holder exists in the store, if not - add holder
  let holder = Holder.load(event.params.to.toHexString());
  if (!holder) {
    holder = new Holder(event.params.to.toHexString());
    holder.save();
  }

  // check if previous holder has any other bonsai, if not - remove holder
  let prevHolder = Holder.load(event.params.from.toHexString());
  if (!prevHolder) return;
  if (!prevHolder.bonsai) {
    let id = prevHolder.id;
    store.remove("Holder", id);
  }
}
