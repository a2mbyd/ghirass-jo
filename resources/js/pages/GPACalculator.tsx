import GPAForm from "@/features/gpa/components/GPAForm";
import PageHeader from "@/shared/ui/PageHeader";

export default function GPACalculator() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-12">
            <PageHeader
                title="حساب المعدل"
                subtitle="أضف مقرراتك وساعاتها ودرجاتك لحساب معدلك"
            />
            <GPAForm />
        </div>
    );
}
