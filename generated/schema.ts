// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Project extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("name", Value.fromString(""));
    this.set("symbol", Value.fromString(""));
    this.set("totalMinted", Value.fromBigInt(BigInt.zero()));
    this.set("totalSales", Value.fromBigInt(BigInt.zero()));
    this.set("totalTransfers", Value.fromBigInt(BigInt.zero()));
    this.set("totalSalesWei", Value.fromBigInt(BigInt.zero()));
    this.set("avgSaleWei", Value.fromBigInt(BigInt.zero()));
    this.set("buyers", Value.fromStringArray(new Array(0)));
    this.set("sellers", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Project entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Project entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Project", id.toString(), this);
    }
  }

  static load(id: string): Project | null {
    return changetype<Project | null>(store.get("Project", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get totalMinted(): BigInt {
    let value = this.get("totalMinted");
    return value!.toBigInt();
  }

  set totalMinted(value: BigInt) {
    this.set("totalMinted", Value.fromBigInt(value));
  }

  get totalSales(): BigInt {
    let value = this.get("totalSales");
    return value!.toBigInt();
  }

  set totalSales(value: BigInt) {
    this.set("totalSales", Value.fromBigInt(value));
  }

  get totalTransfers(): BigInt {
    let value = this.get("totalTransfers");
    return value!.toBigInt();
  }

  set totalTransfers(value: BigInt) {
    this.set("totalTransfers", Value.fromBigInt(value));
  }

  get totalSalesWei(): BigInt {
    let value = this.get("totalSalesWei");
    return value!.toBigInt();
  }

  set totalSalesWei(value: BigInt) {
    this.set("totalSalesWei", Value.fromBigInt(value));
  }

  get avgSaleWei(): BigInt {
    let value = this.get("avgSaleWei");
    return value!.toBigInt();
  }

  set avgSaleWei(value: BigInt) {
    this.set("avgSaleWei", Value.fromBigInt(value));
  }

  get nfts(): Array<string> {
    let value = this.get("nfts");
    return value!.toStringArray();
  }

  set nfts(value: Array<string>) {
    this.set("nfts", Value.fromStringArray(value));
  }

  get sales(): Array<string> {
    let value = this.get("sales");
    return value!.toStringArray();
  }

  set sales(value: Array<string>) {
    this.set("sales", Value.fromStringArray(value));
  }

  get transfers(): Array<string> {
    let value = this.get("transfers");
    return value!.toStringArray();
  }

  set transfers(value: Array<string>) {
    this.set("transfers", Value.fromStringArray(value));
  }

  get buyers(): Array<string> {
    let value = this.get("buyers");
    return value!.toStringArray();
  }

  set buyers(value: Array<string>) {
    this.set("buyers", Value.fromStringArray(value));
  }

  get sellers(): Array<string> {
    let value = this.get("sellers");
    return value!.toStringArray();
  }

  set sellers(value: Array<string>) {
    this.set("sellers", Value.fromStringArray(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("totalBought", Value.fromBigInt(BigInt.zero()));
    this.set("totalBoughtWei", Value.fromBigInt(BigInt.zero()));
    this.set("totalSold", Value.fromBigInt(BigInt.zero()));
    this.set("totalSoldWei", Value.fromBigInt(BigInt.zero()));
    this.set("avgBoughtWei", Value.fromBigInt(BigInt.zero()));
    this.set("avgSoldWei", Value.fromBigInt(BigInt.zero()));
    this.set("totalSent", Value.fromBigInt(BigInt.zero()));
    this.set("totalReceived", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalBought(): BigInt {
    let value = this.get("totalBought");
    return value!.toBigInt();
  }

  set totalBought(value: BigInt) {
    this.set("totalBought", Value.fromBigInt(value));
  }

  get totalBoughtWei(): BigInt {
    let value = this.get("totalBoughtWei");
    return value!.toBigInt();
  }

  set totalBoughtWei(value: BigInt) {
    this.set("totalBoughtWei", Value.fromBigInt(value));
  }

  get totalSold(): BigInt {
    let value = this.get("totalSold");
    return value!.toBigInt();
  }

  set totalSold(value: BigInt) {
    this.set("totalSold", Value.fromBigInt(value));
  }

  get totalSoldWei(): BigInt {
    let value = this.get("totalSoldWei");
    return value!.toBigInt();
  }

  set totalSoldWei(value: BigInt) {
    this.set("totalSoldWei", Value.fromBigInt(value));
  }

  get avgBoughtWei(): BigInt {
    let value = this.get("avgBoughtWei");
    return value!.toBigInt();
  }

  set avgBoughtWei(value: BigInt) {
    this.set("avgBoughtWei", Value.fromBigInt(value));
  }

  get avgSoldWei(): BigInt {
    let value = this.get("avgSoldWei");
    return value!.toBigInt();
  }

  set avgSoldWei(value: BigInt) {
    this.set("avgSoldWei", Value.fromBigInt(value));
  }

  get totalSent(): BigInt {
    let value = this.get("totalSent");
    return value!.toBigInt();
  }

  set totalSent(value: BigInt) {
    this.set("totalSent", Value.fromBigInt(value));
  }

  get totalReceived(): BigInt {
    let value = this.get("totalReceived");
    return value!.toBigInt();
  }

  set totalReceived(value: BigInt) {
    this.set("totalReceived", Value.fromBigInt(value));
  }

  get nft(): Array<string> | null {
    let value = this.get("nft");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set nft(value: Array<string> | null) {
    if (!value) {
      this.unset("nft");
    } else {
      this.set("nft", Value.fromStringArray(<Array<string>>value));
    }
  }

  get sold(): Array<string> {
    let value = this.get("sold");
    return value!.toStringArray();
  }

  set sold(value: Array<string>) {
    this.set("sold", Value.fromStringArray(value));
  }

  get bought(): Array<string> {
    let value = this.get("bought");
    return value!.toStringArray();
  }

  set bought(value: Array<string>) {
    this.set("bought", Value.fromStringArray(value));
  }

  get sent(): Array<string> {
    let value = this.get("sent");
    return value!.toStringArray();
  }

  set sent(value: Array<string>) {
    this.set("sent", Value.fromStringArray(value));
  }

  get received(): Array<string> {
    let value = this.get("received");
    return value!.toStringArray();
  }

  set received(value: Array<string>) {
    this.set("received", Value.fromStringArray(value));
  }
}

export class Bonsai extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("project", Value.fromString(""));
    this.set("currentOwner", Value.fromString(""));
    this.set("totalSales", Value.fromBigInt(BigInt.zero()));
    this.set("totalSalesWei", Value.fromBigInt(BigInt.zero()));
    this.set("avgSaleWei", Value.fromBigInt(BigInt.zero()));
    this.set("totalTransfers", Value.fromBigInt(BigInt.zero()));
    this.set("block", Value.fromBigInt(BigInt.zero()));
    this.set("hash", Value.fromBytes(Bytes.empty()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("tokenID", Value.fromBigInt(BigInt.zero()));
    this.set("tokenURI", Value.fromString(""));
    this.set("image", Value.fromString(""));
    this.set("animation_url", Value.fromString(""));
    this.set("name", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bonsai entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Bonsai entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Bonsai", id.toString(), this);
    }
  }

  static load(id: string): Bonsai | null {
    return changetype<Bonsai | null>(store.get("Bonsai", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get project(): string {
    let value = this.get("project");
    return value!.toString();
  }

  set project(value: string) {
    this.set("project", Value.fromString(value));
  }

  get currentOwner(): string {
    let value = this.get("currentOwner");
    return value!.toString();
  }

  set currentOwner(value: string) {
    this.set("currentOwner", Value.fromString(value));
  }

  get totalSales(): BigInt {
    let value = this.get("totalSales");
    return value!.toBigInt();
  }

  set totalSales(value: BigInt) {
    this.set("totalSales", Value.fromBigInt(value));
  }

  get totalSalesWei(): BigInt {
    let value = this.get("totalSalesWei");
    return value!.toBigInt();
  }

  set totalSalesWei(value: BigInt) {
    this.set("totalSalesWei", Value.fromBigInt(value));
  }

  get avgSaleWei(): BigInt {
    let value = this.get("avgSaleWei");
    return value!.toBigInt();
  }

  set avgSaleWei(value: BigInt) {
    this.set("avgSaleWei", Value.fromBigInt(value));
  }

  get totalTransfers(): BigInt {
    let value = this.get("totalTransfers");
    return value!.toBigInt();
  }

  set totalTransfers(value: BigInt) {
    this.set("totalTransfers", Value.fromBigInt(value));
  }

  get sales(): Array<string> {
    let value = this.get("sales");
    return value!.toStringArray();
  }

  set sales(value: Array<string>) {
    this.set("sales", Value.fromStringArray(value));
  }

  get transfers(): Array<string> {
    let value = this.get("transfers");
    return value!.toStringArray();
  }

  set transfers(value: Array<string>) {
    this.set("transfers", Value.fromStringArray(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get hash(): Bytes {
    let value = this.get("hash");
    return value!.toBytes();
  }

  set hash(value: Bytes) {
    this.set("hash", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get tokenID(): BigInt {
    let value = this.get("tokenID");
    return value!.toBigInt();
  }

  set tokenID(value: BigInt) {
    this.set("tokenID", Value.fromBigInt(value));
  }

  get tokenURI(): string {
    let value = this.get("tokenURI");
    return value!.toString();
  }

  set tokenURI(value: string) {
    this.set("tokenURI", Value.fromString(value));
  }

  get image(): string {
    let value = this.get("image");
    return value!.toString();
  }

  set image(value: string) {
    this.set("image", Value.fromString(value));
  }

  get animation_url(): string {
    let value = this.get("animation_url");
    return value!.toString();
  }

  set animation_url(value: string) {
    this.set("animation_url", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get pot(): string | null {
    let value = this.get("pot");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pot(value: string | null) {
    if (!value) {
      this.unset("pot");
    } else {
      this.set("pot", Value.fromString(<string>value));
    }
  }

  get pet(): string | null {
    let value = this.get("pet");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pet(value: string | null) {
    if (!value) {
      this.unset("pet");
    } else {
      this.set("pet", Value.fromString(<string>value));
    }
  }

  get bark(): string | null {
    let value = this.get("bark");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set bark(value: string | null) {
    if (!value) {
      this.unset("bark");
    } else {
      this.set("bark", Value.fromString(<string>value));
    }
  }

  get leaves(): string | null {
    let value = this.get("leaves");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set leaves(value: string | null) {
    if (!value) {
      this.unset("leaves");
    } else {
      this.set("leaves", Value.fromString(<string>value));
    }
  }

  get fruit(): string | null {
    let value = this.get("fruit");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fruit(value: string | null) {
    if (!value) {
      this.unset("fruit");
    } else {
      this.set("fruit", Value.fromString(<string>value));
    }
  }

  get numberOfFruit(): string | null {
    let value = this.get("numberOfFruit");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set numberOfFruit(value: string | null) {
    if (!value) {
      this.unset("numberOfFruit");
    } else {
      this.set("numberOfFruit", Value.fromString(<string>value));
    }
  }

  get groundCover(): string | null {
    let value = this.get("groundCover");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set groundCover(value: string | null) {
    if (!value) {
      this.unset("groundCover");
    } else {
      this.set("groundCover", Value.fromString(<string>value));
    }
  }

  get background(): string | null {
    let value = this.get("background");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set background(value: string | null) {
    if (!value) {
      this.unset("background");
    } else {
      this.set("background", Value.fromString(<string>value));
    }
  }
}

export class TransferEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("idx", Value.fromBigInt(BigInt.zero()));
    this.set("project", Value.fromString(""));
    this.set("nft", Value.fromString(""));
    this.set("from", Value.fromString(""));
    this.set("to", Value.fromString(""));
    this.set("block", Value.fromBigInt(BigInt.zero()));
    this.set("hash", Value.fromBytes(Bytes.empty()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransferEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save TransferEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("TransferEvent", id.toString(), this);
    }
  }

  static load(id: string): TransferEvent | null {
    return changetype<TransferEvent | null>(store.get("TransferEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get idx(): BigInt {
    let value = this.get("idx");
    return value!.toBigInt();
  }

  set idx(value: BigInt) {
    this.set("idx", Value.fromBigInt(value));
  }

  get project(): string {
    let value = this.get("project");
    return value!.toString();
  }

  set project(value: string) {
    this.set("project", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get hash(): Bytes {
    let value = this.get("hash");
    return value!.toBytes();
  }

  set hash(value: Bytes) {
    this.set("hash", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get isMint(): boolean {
    let value = this.get("isMint");
    return value!.toBoolean();
  }

  set isMint(value: boolean) {
    this.set("isMint", Value.fromBoolean(value));
  }
}

export class SaleEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("idx", Value.fromBigInt(BigInt.zero()));
    this.set("project", Value.fromString(""));
    this.set("nft", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("from", Value.fromString(""));
    this.set("to", Value.fromString(""));
    this.set("block", Value.fromBigInt(BigInt.zero()));
    this.set("hash", Value.fromBytes(Bytes.empty()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SaleEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SaleEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SaleEvent", id.toString(), this);
    }
  }

  static load(id: string): SaleEvent | null {
    return changetype<SaleEvent | null>(store.get("SaleEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get idx(): BigInt {
    let value = this.get("idx");
    return value!.toBigInt();
  }

  set idx(value: BigInt) {
    this.set("idx", Value.fromBigInt(value));
  }

  get project(): string {
    let value = this.get("project");
    return value!.toString();
  }

  set project(value: string) {
    this.set("project", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get hash(): Bytes {
    let value = this.get("hash");
    return value!.toBytes();
  }

  set hash(value: Bytes) {
    this.set("hash", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
