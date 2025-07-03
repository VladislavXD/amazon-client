import Heading from "@/app/components/Heading";
import FavoriteProductItem from "@/app/components/ui/catalog/products-item/FavoriteProductItem";
import ProductItem from "@/app/components/ui/catalog/products-item/ProductItem";
import Layout from "@/app/components/ui/layout/Layout";
import Meta from "@/app/components/ui/Meta";
import { useProfile } from "@/app/hooks/useProfile";
import { NextPage } from "next";
import React from "react";

type Props = {};

const Favorites: NextPage = () => {
  const { profile } = useProfile();

  console.log(profile?.favorites);
  return (
    <Meta title="Favorites">
      <Layout>
        <div className="w-[1200px] max-w-full mx-auto ease-linear transition-all">
          <Heading>
            <h1 className="text-5xl pt-5 pb-5 font-bold">Favorites</h1>
          </Heading>
          
            {profile?.favorites.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                {profile.favorites.map((product) => (
                  <FavoriteProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-lg">You have no favorites yet.</p>
            )}

        </div>
      </Layout>
    </Meta>
  );
};

export default Favorites;
