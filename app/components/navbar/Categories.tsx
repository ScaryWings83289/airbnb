"use client";

//* Packages Imports */
import { usePathname, useSearchParams } from "next/navigation";

//* Components Imports */
import CategoryBox from "@/app/components/CategoryBox";
import Container from "@/app/components/Container";

//* Utils Imports */
import { CATEGORIES } from "@/app/data/categories";

const Categories = () => {
  const pathName = usePathname();
  const params = useSearchParams();

  const category = params?.get("category");
  const isMainPage = pathName === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {CATEGORIES.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
