const { BN, ether, expectRevert } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20 } = require('./behaviours/ERC20.behaviour');
const { shouldBehaveLikeERC20Mintable } = require('./behaviours/ERC20Mintable.behaviour');

const PublicMintableERC20 = artifacts.require('PublicMintableERC20');

contract('PublicMintableERC20', function ([owner, other, thirdParty]) {
  const _name = 'PublicMintableERC20';
  const _symbol = 'ERC20';
  const _decimals = new BN(8);
  const _initialSupply = new BN(100000000);

  const fee = ether('0.1');

  context('creating valid token', function () {
    describe('as a PublicMintableERC20', function () {
      describe('without initial supply', function () {
        beforeEach(async function () {
          this.token = await PublicMintableERC20.new(
            _name,
            _symbol,
            _decimals,
            0,
            {
              from: owner,
              value: fee,
            },
          );
        });

        describe('once deployed', function () {
          it('total supply should be equal to zero', async function () {
            (await this.token.totalSupply()).should.be.bignumber.equal(new BN(0));
          });

          it('owner balance should be equal to zero', async function () {
            (await this.token.balanceOf(owner)).should.be.bignumber.equal(new BN(0));
          });
        });
      });

      describe('with initial supply', function () {
        beforeEach(async function () {
          this.token = await PublicMintableERC20.new(
            _name,
            _symbol,
            _decimals,
            _initialSupply,
            {
              from: owner,
              value: fee,
            },
          );
        });

        describe('once deployed', function () {
          it('total supply should be equal to initial supply', async function () {
            (await this.token.totalSupply()).should.be.bignumber.equal(_initialSupply);
          });

          it('owner balance should be equal to initial supply', async function () {
            (await this.token.balanceOf(owner)).should.be.bignumber.equal(_initialSupply);
          });
        });
      });
    });
  });

  context('PublicMintableERC20 token behaviours', function () {
    beforeEach(async function () {
      this.token = await PublicMintableERC20.new(
        _name,
        _symbol,
        _decimals,
        0,
        {
          from: owner,
          value: fee,
        },
      );
    });

    context('like a ERC20', function () {
      beforeEach(async function () {
        // NOTE: mint initial supply to test behaviour
        await this.token.mint(owner, _initialSupply, { from: owner });
      });

      shouldBehaveLikeERC20(_name, _symbol, _decimals, _initialSupply, [owner, other, thirdParty]);
    });

    context('like a PublicMintableERC20', function () {
      describe('with anyone', function () {
        const from = thirdParty;

        it('anyone should be able to mint', async function () {
          const amount = new BN(50);

          await this.token.mint(thirdParty, amount, { from });
        });
      });
    });
  });
});
