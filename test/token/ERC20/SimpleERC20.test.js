const { BN, expectRevert } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20 } = require('./behaviours/ERC20.behaviour');

const SimpleERC20 = artifacts.require('SimpleERC20');

contract('SimpleERC20', function ([owner, other, thirdParty]) {
  const _name = 'SimpleERC20';
  const _symbol = 'ERC20';
  const _decimals = new BN(18);
  const _initialSupply = new BN(100000000);

  const fee = 0;

  context('creating valid token', function () {
    describe('without initial supply', function () {
      it('should fail', async function () {
        await expectRevert(
          SimpleERC20.new(
            _name,
            _symbol,
            0,
            {
              from: owner,
              value: fee,
            },
          ),
          'SimpleERC20: supply cannot be zero',
        );
      });
    });

    describe('with initial supply', function () {
      beforeEach(async function () {
        this.token = await SimpleERC20.new(
          _name,
          _symbol,
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

  context('SimpleERC20 token behaviours', function () {
    beforeEach(async function () {
      this.token = await SimpleERC20.new(
        _name,
        _symbol,
        _initialSupply,
        {
          from: owner,
          value: fee,
        },
      );
    });

    context('like a ERC20', function () {
      shouldBehaveLikeERC20(_name, _symbol, _decimals, _initialSupply, [owner, other, thirdParty]);
    });
  });
});