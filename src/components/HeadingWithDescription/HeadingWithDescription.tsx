type HeadingWithDescriptionProps = {
  heading: string;
  description: string;
};

export const HeadingWithDescription = ({ description, heading }: HeadingWithDescriptionProps) => {
  return (
    <div>
      <h4 className="text-2xl font-bold md:text-3xl">{heading}</h4>
      <p className="mt-2">{description}</p>
    </div>
  );
};
