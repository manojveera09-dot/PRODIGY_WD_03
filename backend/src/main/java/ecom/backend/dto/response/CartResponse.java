package ecom.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {

    private Long cartId;

    private String customerName;

    private List<CartItemResponse> items;

    private BigDecimal grandTotal;
}