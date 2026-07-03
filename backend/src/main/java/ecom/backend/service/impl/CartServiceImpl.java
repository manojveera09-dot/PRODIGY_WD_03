package ecom.backend.service.impl;

import ecom.backend.dto.request.AddToCartRequest;
import ecom.backend.dto.request.UpdateCartRequest;
import ecom.backend.dto.response.CartItemResponse;
import ecom.backend.dto.response.CartResponse;
import ecom.backend.entity.Cart;
import ecom.backend.entity.CartItem;
import ecom.backend.entity.Product;
import ecom.backend.entity.User;
import ecom.backend.repository.CartItemRepository;
import ecom.backend.repository.CartRepository;
import ecom.backend.repository.ProductRepository;
import ecom.backend.repository.UserRepository;
import ecom.backend.service.interfaces.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public CartResponse addToCart(String email, AddToCartRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();

                    return cartRepository.save(newCart);
                });

        CartItem cartItem = cartItemRepository
                .findByCartAndProduct(cart, product)
                .orElse(null);

        if (cartItem == null) {

            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .totalPrice(
                            product.getPrice().multiply(
                                    BigDecimal.valueOf(request.getQuantity())
                            )
                    )
                    .build();

        } else {

            int quantity = cartItem.getQuantity() + request.getQuantity();

            if (quantity > product.getStock()) {
                throw new RuntimeException("Insufficient stock");
            }

            cartItem.setQuantity(quantity);

            cartItem.setTotalPrice(
                    product.getPrice().multiply(
                            BigDecimal.valueOf(quantity)
                    )
            );
        }

        cartItemRepository.save(cartItem);

        return getCart(email);
    }

    @Override
    public CartResponse getCart(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart is empty"));

        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        List<CartItemResponse> responses = new ArrayList<>();

        BigDecimal grandTotal = BigDecimal.ZERO;

        for (CartItem item : cartItems) {

            responses.add(
                    CartItemResponse.builder()
                            .cartItemId(item.getId())
                            .productId(item.getProduct().getId())
                            .productName(item.getProduct().getName())
                            .imageUrl(item.getProduct().getImageUrl())
                            .price(item.getProduct().getPrice())
                            .quantity(item.getQuantity())
                            .totalPrice(item.getTotalPrice())
                            .build()
            );

            grandTotal = grandTotal.add(item.getTotalPrice());
        }

        return CartResponse.builder()
                .cartId(cart.getId())
                .customerName(user.getFullName())
                .items(responses)
                .grandTotal(grandTotal)
                .build();
    }
        @Override
    public CartResponse updateCartItem(
            String email,
            Long cartItemId,
            UpdateCartRequest request
    ) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        // Ownership check
        if (!cartItem.getCart().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access denied");
        }

        Product product = cartItem.getProduct();

        if (request.getQuantity() > product.getStock()) {
            throw new RuntimeException("Insufficient stock");
        }

        cartItem.setQuantity(request.getQuantity());

        cartItem.setTotalPrice(
                product.getPrice().multiply(
                        BigDecimal.valueOf(request.getQuantity())
                )
        );

        cartItemRepository.save(cartItem);

        return getCart(email);
    }

    @Override
    public void removeCartItem(
            String email,
            Long cartItemId
    ) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        // Ownership check
        if (!cartItem.getCart().getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access denied");
        }

        cartItemRepository.delete(cartItem);
    }

    @Override
    public void clearCart(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cartItemRepository.deleteByCart(cart);
    }
}