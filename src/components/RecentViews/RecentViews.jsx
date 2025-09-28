import { Typography, List, Divider, Box } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import {
  RecentViewsContainer,
  ProductItem,
  PriceText,
} from "./RecentViews.styles";



const RecentViews = ({ show }) => {
  const trans = useTranslations("translations");

  const recentProducts = [
    {
      id: "1",
      name: "Boxing Equipment Set",
      price: 132.48,
      stock: "low",
      stockCount: 1,
    },
    {
      id: "2",
      name: "[Trusted] Custom Logo Print",
      price: 43.22,
      stock: "out",
    },
    {
      id: "3",
      name: "5/10/20pairs Unisex Socks",
      price: 66.89,
      stock: "normal",
    },
  ];

  return (
    <RecentViewsContainer show={show}>
      <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 600 }}>
        {trans("link.userDropdown.recentViews")}
      </Typography>
      <Divider />
      <List sx={{ p: 1 }}>
        {recentProducts.map((product) => (
          <ProductItem key={product.id}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" noWrap>
                {product.name}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
              >
                <PriceText>
                  {trans("link.userDropdown.currency", {
                    amount: product.price.toFixed(2),
                  })}
                </PriceText>
              </Box>
            </Box>
            <AddShoppingCart fontSize="small" color="primary" />
          </ProductItem>
        ))}
      </List>
    </RecentViewsContainer>
  );
};

export default RecentViews;
