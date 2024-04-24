import MailForm from './_forms/MailForm';

export default function Page() {
  return (
    <section className="flex flex-col w-full max-w-[48rem] rounded-lg  gap-6 p-3 md:p-8 md:mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">비밀번호 재설정</h1>
        <p>가입했던 메일을 통해 비밀번호를 재설정할 수 있어요.</p>
      </div>

      <MailForm />
    </section>
  );
}
