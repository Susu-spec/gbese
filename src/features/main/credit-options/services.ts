import api from "@/lib/axios";

export async function getCreditProviders() {
    const response = await api.get("/credit/providers");

    return response.data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        defaultInterestRate: item.default_interest_rate,
        minLoanAmount: item.min_loan_amount,
        maxLoanAmount: item.max_loan_amount,
        maxTenureMonths: item.max_tenure_months,
        endpointUrl: item.endpoint_url,
    }));
}

