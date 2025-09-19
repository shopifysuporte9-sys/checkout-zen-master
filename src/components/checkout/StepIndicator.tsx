import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Identificação" },
  { number: 2, label: "Entrega" },
  { number: 3, label: "Pagamento" },
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="relative flex items-center justify-between">
      {/* Progress Line */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-border z-0">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ 
            width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Steps */}
      {steps.map((step) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        
        return (
          <div key={step.number} className="flex flex-col items-center z-10 relative">
            <motion.div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                isCompleted && "bg-success text-success-foreground border-success",
                isActive && "bg-primary text-primary-foreground border-primary",
                !isActive && !isCompleted && "bg-muted text-muted-foreground border-muted"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{step.number}</span>
              )}
            </motion.div>
            
            <span
              className={cn(
                "mt-2 text-sm font-medium transition-colors duration-300",
                isActive && "text-primary font-semibold",
                isCompleted && "text-foreground",
                !isActive && !isCompleted && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};