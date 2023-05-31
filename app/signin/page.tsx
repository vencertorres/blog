import Form from "./form";

export default function SignIn() {
  return (
    <main className="hero min-h-[calc(100vh_-_4.1rem)] bg-base-200">
      <div className="card mx-auto max-w-sm bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-xl font-medium">Sign In</h1>
          <Form />
        </div>
      </div>
    </main>
  );
}
