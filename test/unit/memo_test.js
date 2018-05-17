
describe("Memo.constructor()", function() {
  it("throws error when type is invalid", function() {
    expect(() => new RoverBase.Memo("test")).to.throw(/Invalid memo type/);
  });
});

describe("Memo.none()", function() {
  it("converts to/from xdr object", function() {
    let memo = RoverBase.Memo.none().toXDRObject();
    expect(memo.value()).to.be.undefined;

    let baseMemo = RoverBase.Memo.fromXDRObject(memo);
    expect(baseMemo.type).to.be.equal(RoverBase.MemoNone);
    expect(baseMemo.value).to.be.null;
  });
});

describe("Memo.text()", function() {

  it("returns a value for a correct argument", function() {
    expect(() => RoverBase.Memo.text("test")).to.not.throw();
    let memoUtf8 = RoverBase.Memo.text("三代之時")

    let a = new Buffer(memoUtf8.toXDRObject().value(), "utf8");
    let b = new Buffer("三代之時", "utf8");
    expect(a).to.be.deep.equal(b);
  });

  it("converts to/from xdr object", function() {
    let memo = RoverBase.Memo.text("test").toXDRObject();
    expect(memo.arm()).to.equal('text');
    expect(memo.text()).to.equal('test');
    expect(memo.value()).to.equal('test');

    let baseMemo = RoverBase.Memo.fromXDRObject(memo);
    expect(baseMemo.type).to.be.equal(RoverBase.MemoText);
    expect(baseMemo.value).to.be.equal('test');
  });

  it("throws an error when invalid argument was passed", function() {
    expect(() => RoverBase.Memo.text()).to.throw(/Expects string/);
    expect(() => RoverBase.Memo.text({})).to.throw(/Expects string/);
    expect(() => RoverBase.Memo.text(10)).to.throw(/Expects string/);
    expect(() => RoverBase.Memo.text(Infinity)).to.throw(/Expects string/);
    expect(() => RoverBase.Memo.text(NaN)).to.throw(/Expects string/);
  });

  it("throws an error when string is longer than 28 bytes", function() {
    expect(() => RoverBase.Memo.text("12345678901234567890123456789")).to.throw(/Text should be/);
    expect(() => RoverBase.Memo.text("三代之時三代之時三代之時")).to.throw(/Text should be/);
  });

});

describe("Memo.id()", function() {
  it("returns a value for a correct argument", function() {
    expect(() => RoverBase.Memo.id("1000")).to.not.throw();
    expect(() => RoverBase.Memo.id("0")).to.not.throw();
  });

  it("converts to/from xdr object", function() {
    let memo = RoverBase.Memo.id("1000").toXDRObject();
    expect(memo.arm()).to.equal('id');
    expect(memo.id().toString()).to.equal('1000');

    let baseMemo = RoverBase.Memo.fromXDRObject(memo);
    expect(baseMemo.type).to.be.equal(RoverBase.MemoID);
    expect(baseMemo.value).to.be.equal('1000');
  });

  it("throws an error when invalid argument was passed", function() {
    expect(() => RoverBase.Memo.id()).to.throw(/Expects a int64/);
    expect(() => RoverBase.Memo.id({})).to.throw(/Expects a int64/);
    expect(() => RoverBase.Memo.id(Infinity)).to.throw(/Expects a int64/);
    expect(() => RoverBase.Memo.id(NaN)).to.throw(/Expects a int64/);
    expect(() => RoverBase.Memo.id("test")).to.throw(/Expects a int64/);
  });
});

describe("Memo.hash() & Memo.return()", function() {
  it("hash converts to/from xdr object", function() {
    let buffer = new Buffer(32).fill(10);

    let memo = RoverBase.Memo.hash(buffer).toXDRObject();
    expect(memo.arm()).to.equal('hash');
    expect(memo.hash().length).to.equal(32);
    expect(memo.hash()).to.deep.equal(buffer);

    let baseMemo = RoverBase.Memo.fromXDRObject(memo);
    expect(baseMemo.type).to.be.equal(RoverBase.MemoHash);
    expect(baseMemo.value.length).to.equal(32);
    expect(baseMemo.value.toString('hex')).to.be.equal(buffer.toString('hex'));
  });

  it("return converts to/from xdr object", function() {
    let buffer = new Buffer(32).fill(10);

    // Testing string hash
    let memo = RoverBase.Memo.return(buffer.toString("hex")).toXDRObject();
    expect(memo.arm()).to.equal('retHash');
    expect(memo.retHash().length).to.equal(32);
    expect(memo.retHash().toString('hex')).to.equal(buffer.toString('hex'));

    let baseMemo = RoverBase.Memo.fromXDRObject(memo);
    expect(baseMemo.type).to.be.equal(RoverBase.MemoReturn);
    expect(Buffer.isBuffer(baseMemo.value)).to.be.true;
    expect(baseMemo.value.length).to.equal(32);
    expect(baseMemo.value.toString('hex')).to.be.equal(buffer.toString('hex'));
  });

  var methods = [RoverBase.Memo.hash, RoverBase.Memo.return];

  it("returns a value for a correct argument", function() {
    for (let i in methods) {
      let method = methods[i];
      expect(() => method(new Buffer(32))).to.not.throw();
      expect(() => method('0000000000000000000000000000000000000000000000000000000000000000')).to.not.throw();
    }
  });

  it("throws an error when invalid argument was passed", function() {
    for (let i in methods) {
      let method = methods[i];
      expect(() => method()).to.throw(/Expects a 32 byte hash value/);
      expect(() => method({})).to.throw(/Expects a 32 byte hash value/);
      expect(() => method(Infinity)).to.throw(/Expects a 32 byte hash value/);
      expect(() => method(NaN)).to.throw(/Expects a 32 byte hash value/);
      expect(() => method("test")).to.throw(/Expects a 32 byte hash value/);
      expect(() => method([0, 10, 20])).to.throw(/Expects a 32 byte hash value/);
      expect(() => method(new Buffer(33))).to.throw(/Expects a 32 byte hash value/);
      expect(() => method('00000000000000000000000000000000000000000000000000000000000000')).to.throw(/Expects a 32 byte hash value/);
      expect(() => method('000000000000000000000000000000000000000000000000000000000000000000')).to.throw(/Expects a 32 byte hash value/);
    }
  });
});
