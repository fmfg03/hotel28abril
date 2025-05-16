
type AmenitiesDescriptionProps = {
  description: string;
};

export default function AmenitiesDescription({ description }: AmenitiesDescriptionProps) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
