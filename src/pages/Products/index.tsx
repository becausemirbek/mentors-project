import React, { useContext, useEffect } from "react";
import { productsContext } from "../../context/productsContext";
import { Button, Card } from "react-bootstrap";
import { CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { ProductI } from "../CreateProduct";

const Products = () => {
  const { getProducts, products } = useContext(productsContext);

  useEffect(() => {
    getProducts("", "");
  }, []);

  console.log(products, "products");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {products
        ? products.map((product: ProductI) => (
            <Card style={{ width: "23%" }}>
              <CardMedia
                sx={{ height: 140 }}
                image={product.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="sm">Share</Button>
                <Button size="sm">Learn More</Button>
              </CardActions>
            </Card>
          ))
        : null}
    </div>
  );
};

export default Products;
