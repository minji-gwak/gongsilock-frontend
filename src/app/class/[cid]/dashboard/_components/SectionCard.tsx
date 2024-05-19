import { PropsWithChildren } from 'react';

type SectionCardProp = {
  title: string;
  description?: string;
};

export const SectionCard = ({ title, description, children }: PropsWithChildren<SectionCardProp>) => {
  const hasDescription = description;

  return (
    <section className="p-6 border border-gray-200 rounded text-green-900 space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl lg:text-xl font-semibold">{title}</h3>
        {hasDescription && <p className="text-green-900">{description}</p>}
      </div>

      {children}
    </section>
  );
};
