import {
  Transfer as TransferEvent
} from "../generated/Token/Token"
import {
  Bonsai,
  Holder
} from "../generated/schema"
import {
  log,
  ipfs,
  json,
  JSONValue
} from "@graphprotocol/graph-ts"

const ipfsHash = "QmVtJUJrjWfthrGFvkwFciZcvoNLzCrC6EXAQwimYBUZeQ"

export function handleTransfer(event: TransferEvent): void {
  let bonsai = Bonsai.load(event.params.tokenId.toString());

  if (bonsai == null) {
    bonsai = new Bonsai(event.params.tokenId.toString());
    bonsai.tokenID = event.params.tokenId;
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
                bonsai.Pot = value;
              }
              if (trait == "Pet") {
                bonsai.Pet = value;
              }
              if (trait == "Bark") {
                bonsai.Bark = value;
              }
              if (trait == "Leaves") {
                bonsai.Leaves = value;
              }
              if (trait == "Fruit") {
                bonsai.Fruit = value;
              }
              if (trait == "Number of fruit") {
                bonsai.NumberOfFruit = value;
              }
              if (trait == "Ground cover") {
                bonsai.GroundCover = value;
              }
              if (trait == "Background") {
                bonsai.Background = value;
              }
            }
          }
        }
      }
    }
  }
  bonsai.holder = event.params.to.toHexString();
  bonsai.save();

  let holder = Holder.load(event.params.to.toHexString());
  if (!holder) {
    holder = new Holder(event.params.to.toHexString());
    holder.save();
  }
}
