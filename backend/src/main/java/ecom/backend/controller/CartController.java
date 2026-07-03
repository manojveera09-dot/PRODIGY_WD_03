package ecom.backend.controller;

import ecom.backend.dto.request.AddToCartRequest;
import ecom.backend.dto.request.UpdateCartRequest;
import ecom.backend.dto.response.CartResponse;
import ecom.backend.service.interfaces.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request
    ) {

        return ResponseEntity.ok(
                cartService.addToCart(
                        authentication.getName(),
                        request
                )
        );
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                cartService.getCart(authentication.getName())
        );
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(
            Authentication authentication,
            @PathVariable Long cartItemId,
            @Valid @RequestBody UpdateCartRequest request
    ) {

        return ResponseEntity.ok(
                cartService.updateCartItem(
                        authentication.getName(),
                        cartItemId,
                        request
                )
        );
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            Authentication authentication,
            @PathVariable Long cartItemId
    ) {

        cartService.removeCartItem(
                authentication.getName(),
                cartItemId
        );

        return ResponseEntity.ok("Cart item removed successfully.");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(
            Authentication authentication
    ) {

        cartService.clearCart(authentication.getName());

        return ResponseEntity.ok("Cart cleared successfully.");
    }
}