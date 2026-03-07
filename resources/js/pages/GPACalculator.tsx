import PageHeader from '@/components/PageHeader';
import GPAForm from '@/components/GPA/GPAForm';

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
