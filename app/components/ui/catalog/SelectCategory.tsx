import { CategoryService } from "@/app/services/category.service";
import { EnumProductSort } from "@/app/services/product/product.types";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

import { useRouter } from "next/router";
import { useAuth } from "@/app/hooks/useAuth";

const SelectCategory: FC = () => {
  const router = useRouter();
  
  const currentSort = router.query.sort as string || 'newest'
  const currentCategory = router.query.category as string || 'all'


  const { data: categories, isLoading } = useQuery({
    queryKey: ["get categories"],
    queryFn: () => CategoryService.getAll(),
    select: ({ data }) => data,
  });


  const handleCategory = (keys: any) => {
    const selectedKey = Array.from(keys)[0] as string;

    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: selectedKey },
    });
  };


  const handleSort = (keys: any) => {
    const selectSort = Array.from(keys)[0] as string;

    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: selectSort },
    });
  };
  

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
