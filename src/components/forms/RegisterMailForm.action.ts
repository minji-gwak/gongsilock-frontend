'use server';

export async function sendRegisterMail(data) {
  console.log({ data });
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  return { submitting: true, message: '' };
}
