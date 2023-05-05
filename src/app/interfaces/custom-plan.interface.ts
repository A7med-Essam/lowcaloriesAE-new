export interface ICustomPlanResponse {
    id:          number;
    program_id:  number;
    name:        string;
    name_ar:     string;
    no_meals:    number;
    plan_prices: PlanPrices;
    details:     Details;
    options:     any[];
    myprogram:   IMyProgram;
}

interface IMyProgram {
    id:             number;
    active:         number;
    type:           string;
    company:        string;
    name:           string;
    name_ar:        string;
    description:    string;
    description_ar: string;
    image:          string;
    order_number:   number;
    max_meals:      number;
    no_snacks:      number;
    shortcut_name:  null;
    image_new:      string;
    bag_price:      number;
    snack_price:    number;
}

interface Details {
    max_meal:  number;
    max_snack: number;
    max_days:  number;
    min_days:  number;
}

interface PlanPrices {
    one_meal:   number;
    two_meal:   number;
    three_meal: number;
    four_meal:  number;
    five_meal:  number;
    six_meal:   number;
}