interface EmptyWalletStateProps {
  show: boolean;
}

export function EmptyWalletState({ show }: EmptyWalletStateProps) {
  if (!show) return null;

  return (
    <div className="text-sm text-primary-700/70">
      Your wallet is empty. Fund it to start transacting.
    </div>
  );
}
