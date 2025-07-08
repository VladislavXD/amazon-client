import { CategoryService } from "@/src/services/category.service";
import { EnumProductSort } from "@/src/services/product/product.types";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { ReadonlyURLSearchParams} from "next/navigation";
import { useSearchParams } from "next/navigation";

const SelectCategory: FC = () => {
  const router = useRouter();


  const searchParams = useSearchParams() as ReadonlyURLSearchParams;

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'newest';

  const { data: categories, isLoading } = useQuery({
    queryKey: ["get categories"],
    queryFn: () => CategoryService.getAll(),
    select: ({ data }) => data,
  });


  const handleCategory = (keys: any) => {
  const selectedKey = Array.from(keys)[0] as string

  const params = new URLSearchParams(searchParams)
  params.set('category', selectedKey)

  router.push(`?${params.toString()}`)
}

const handleSort = (keys: any) => {
  const selectedSort = Array.from(keys)[0] as string

  const params = new URLSearchParams(searchParams)
  params.set('sort', selectedSort)

  router.push(`?${params.toString()}`)
}

  

  return (
    <div className="flex items-center justify-between gap-2 mb-4 mt-5 ">
      <Select
        key={"select-category"}
        className="md:max-w-xs max-w-32"
        label="Categories"
        labelPlacement="inside"
        placeholder="Select category"
        defaultSelectedKeys={[currentCategory]}
        onSelectionChange={handleCategory}
        isLoading={isLoading}
      >
        {[
          <SelectItem key="all" value="all">
            All Categories
          </SelectItem>,
          ...(categories?.map((category) => (
            <SelectItem
              key={category.slug}
              value={category.slug}
              className="capitalize"
            >
              {category.name}
            </SelectItem>
          )) || []),
        ]}
      </Select>



      {/* ENUM PRODUCT SORT */}
      <Select
        key={"select-sort"}
        className="md:max-w-xs max-w-32"
        label="Sort by"
        labelPlacement="inside"
        placeholder=""
        defaultSelectedKeys={[currentSort]}
        onSelectionChange={handleSort}
        isLoading={isLoading}
      >
        {(
          Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
        ).map((key) => {
          const value = EnumProductSort[key];
          const displayName = value.replace('-', ' ').replace(/\b\w/g, l=> l.toUpperCase())
          
          return (
                  <SelectItem
                    key={value}
                    value={value}
                    className="capitalize"
                  >
                    {displayName}
                  </SelectItem>
                
              
          );
        })}
      </Select>
    </div>
  );
};

export default SelectCategory;
