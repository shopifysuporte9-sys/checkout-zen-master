import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-checkout-bg">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Checkout Profissional
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experimente nosso checkout moderno e intuitivo com design profissional e animações suaves.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/checkout')}
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ir para o Checkout
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Interface moderna • Animações suaves • Design responsivo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
