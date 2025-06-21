interface ErrorProps {
    message: string;
}

export default function Error({ message }: ErrorProps) {
    return (
        <div className="error">
            <p>{message}</p>
        </div>
    );
}