package ecom.backend.service.interfaces;

import ecom.backend.dto.request.AddToCartRequest;
import ecom.backend.dto.request.UpdateCartRequest;
import ecom.backend.dto.response.CartResponse;

public interface CartService {

    CartResponse addToCart(String email, AddToCartRequest request);

    CartResponse getCart(String email);

    CartResponse updateCartItem(
            String email,
            Long cartItemId,
            UpdateCartRequest request
    );

    void removeCartItem(
            String email,
            Long cartItemId
    );

    void clearCart(String email);
}