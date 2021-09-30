<template>
  <div>
    <b-jumbotron
      text-variant="white"
      header="ERC20 Token Generator"
      class="mb-0 blue-gradient"
      fluid
    >
      <template #lead>
        Create an ERC20 Token in less than a minute with the most used Smart
        Contract Generator for ERC20 Token.
        <br />
        No login. No setup. No coding required.
      </template>
      <hr class="my-5" />
      <p>
        <b-button
          to="/erc20-token/"
          size="lg"
          variant="success"
          class="my-2 py-3 px-5 text-uppercase"
        >
          Create ERC20 Token
        </b-button>
      </p>
    </b-jumbotron>
    <b-row id="how-it-works" class="mx-0">
      <b-col lg="8" offset-lg="2" class="mb-3">
        <h2 class="p-5 font-weight-lighter text-center text-dark">
          How it works
        </h2>
        <h4 class="text-center font-weight-light">
          Create an ERC20 Token in less than a minute.
        </h4>
        <p class="text-center font-weight-light">
          Easily deploy Smart Contract for a Standard, Capped, Mintable,
          Burnable, Payable ERC20 Token.
          <br />
          No login. No setup. No coding required.
        </p>
        <ui--how-it-works></ui--how-it-works>
      </b-col>
    </b-row>
    <b-row id="features" class="peach-gradient mx-0">
      <b-col lg="12" xl="8" offset-xl="2" class="py-5">
        <h2 class="p-5 font-weight-lighter text-center text-light">Features</h2>
        <ui--features></ui--features>
      </b-col>
    </b-row>
    <b-row id="faq" class="purple-gradient mx-0">
      <b-col lg="12" xl="8" offset-xl="2" class="py-5">
        <h2 class="p-5 font-weight-lighter text-center text-light">FAQ</h2>
        <ui--faq></ui--faq>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
