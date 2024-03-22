export default function HomeProductCard({ cards }) {
  return (
    <div className="grid grid-cols-12 rounded-md">
      {cards.map((card) => (
        <div key={card.name} className="col-span-6 lg:col-span-3 gap-x-2">
          <div className="flex flex-col rounded-md p-4 w-full">
            <img src={card.img} alt={card.name} className="rounded-sm" />

            <div
              className="flex justify-between mt-4 mb-2 text-lg "
              style={{ color: "var(--surface-900)" }}
            >
              <span>{card.name}</span>
              <span className="">${card.cost}</span>
            </div>
            <span style={{ color: `var(--surface-600)` }} className="text-base">
              {card.brand}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
