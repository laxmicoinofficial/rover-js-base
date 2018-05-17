describe("Network.current()", function() {
  it("defaults network is null", function() {
    expect(RoverBase.Network.current()).to.be.null;
  });
});

describe("Network.useTestNetwork()", function() {
  it("switches to the test network", function() {
    RoverBase.Network.useTestNetwork();
    expect(RoverBase.Network.current().networkPassphrase()).to.equal(RoverBase.Networks.TESTNET)
  });
});

describe("Network.usePublicNetwork()", function() {
  it("switches to the public network", function() {
    RoverBase.Network.usePublicNetwork();
    expect(RoverBase.Network.current().networkPassphrase()).to.equal(RoverBase.Networks.PUBLIC)
  });
});
