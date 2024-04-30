type TitleWithDescriptionProps = {
  title: string;
  description: string;
};

export const TitleWithDescription = ({ description, title }: TitleWithDescriptionProps) => {
  return (
    <div>
      <h4 className="text-2xl font-bold md:text-3xl">{title}</h4>
      <p className="mt-2">{description}</p>
    </div>
  );
};
