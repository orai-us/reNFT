import { ethers } from 'ethers';
import { getSigners } from 'hardhat';

type Args = {
  num: number;
  amount: string;
};

export default async function ({ num = 10, amount = '0' }: Args) {
  //
  const signers = getSigners(num + 1);

  const sendAmount = ethers.utils.parseEther(amount);

  if (!sendAmount.isZero()) {
    for (let i = 1; i <= num; i++) {
      // wait 1 block confirm
      const res = await signers[0].sendTransaction({
        to: signers[i].getAddress(),
        value: sendAmount
      });
      // last transaction need confirm block
      if (i === num) {
        await res.wait();
      }
    }
  }

  for (let i = 0; i <= num; i++) {
    const signer = signers[i];
    console.log(
      i,
      await signer.getAddress(),
      (await signer.getBalance()).toString()
    );
  }
}
