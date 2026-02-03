package com.financial.stockapp.entity.enums;

public class Enum {
    public enum AuthProvider { LOCAL, GOOGLE, APPLE }
    public enum Exchange { HOSE, HNX, UPCOM }
    public enum TransactionType { DEPOSIT, WITHDRAW, ORDER_FREEZE, ORDER_UNFREEZE, TRADE_BUY, TRADE_SELL, FEE_TRANSACTION, TAX_SELL }
    public enum OrderSide { BUY, SELL }
    public enum OrderType { LIMIT, MARKET, ATO, ATC }
    public enum OrderStatus { PENDING, PARTIALLY_FILLED, FILLED, CANCELLED, REJECTED }
    public enum NotificationType { SYSTEM, ORDER_MATCHED, PRICE_ALERT, PROMOTION }
    public enum RoleType {
        ROLE_USER,
        ROLE_ADMIN,
        ROLE_STAFF
    }
}
