enum AdaAccess {
  ACCESSIBLE = "accessible",
  INACCESSIBLE = "inaccessible",
  PARTIALLY_ACCESSIBLE = "partiallyAccessible",
}

enum RequestStatus {
  NEW = "new",
  OVERDUE = "overdue",
  VIEWED = "viewed",
  WONT_DO = "wontDo",
  SOLVED = "solved",
  PENDING = "pending",
  POSTPONED = "postponed",
}

enum RequestUrgency {
  EMERGENCY = "emergency",
  URGENT = "urgent",
  ROUTINE = "routine",
}

enum HttpMethods {
  UPDATE = "UPDATE",
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "POST",
}
