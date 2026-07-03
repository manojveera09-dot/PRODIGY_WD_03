package ecom.backend.controller;

import ecom.backend.dto.response.OrderResponse;
import ecom.backend.service.interfaces.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderResponse> placeOrder(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                orderService.placeOrder(authentication.getName())
        );
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                orderService.getMyOrders(authentication.getName())
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            Authentication authentication,
            @PathVariable Long orderId
    ) {

        return ResponseEntity.ok(
                orderService.getOrderById(
                        authentication.getName(),
                        orderId
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status
    ) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(orderId, status)
        );
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> cancelOrder(
            Authentication authentication,
            @PathVariable Long orderId
    ) {

        orderService.cancelOrder(
                authentication.getName(),
                orderId
        );

        return ResponseEntity.ok("Order cancelled successfully.");
    }
}