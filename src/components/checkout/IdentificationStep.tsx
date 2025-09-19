import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutData } from "@/pages/Checkout";

interface IdentificationStepProps {
  data: CheckoutData;
  updateData: (field: keyof CheckoutData, value: string) => void;
  nextStep: () => void;
}

export const IdentificationStep = ({ data, updateData, nextStep }: IdentificationStepProps) => {
  const isValid = data.fullName && data.email && data.phone && data.cpf;

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').slice(0, 14);
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').slice(0, 15);
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4').slice(0, 14);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
          1
        </div>
        <h2 className="text-xl font-semibold">Identificação</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            placeholder="Seu nome completo"
            value={data.fullName}
            onChange={(e) => updateData('fullName', e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu-email@exemplo.com"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            placeholder="(99) 99999-9999"
            value={data.phone}
            onChange={(e) => updateData('phone', formatPhone(e.target.value))}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={data.cpf}
            onChange={(e) => updateData('cpf', formatCPF(e.target.value))}
            className="h-12"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={nextStep}
          disabled={!isValid}
          className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <span>Ir para Entrega</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};