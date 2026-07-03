package ecom.backend.service.interfaces;

import ecom.backend.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(String email);

    List<OrderResponse> getMyOrders(String email);

    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(
            String email,
            Long orderId
    );

    OrderResponse updateOrderStatus(
            Long orderId,
            String status
    );

    void cancelOrder(
            String email,
            Long orderId
    );
}