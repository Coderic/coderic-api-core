export class PortalError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode = 400,
    public readonly details: unknown = null,
  ) {
    super(message);
    this.name = "PortalError";
  }
}

export function errorBody(exc: PortalError) {
  return {
    error: exc.code,
    message: exc.message,
    ...(exc.details !== null ? { details: exc.details } : {}),
  };
}
