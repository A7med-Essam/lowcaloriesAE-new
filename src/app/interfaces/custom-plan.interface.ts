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

export interface ISubscriptionData {
    number_of_Days:      string;
    number_of_Snacks:    number;
    number_of_Meals:     string[];
    Plan_Type:           ICustomPlanResponse;
    start_date:          string;
    delivery_days:       string[];
    program_id:          number;
}

// ========================================================================== MEALS ==========================================================================
export interface ICategoriesResponse {
    id:      number;
    level:   string;
    type:    string;
    name:    string;
    name_ar: string;
}

export interface ICustomMealsResponse {
    id:             number;
    category_id:    number;
    image:          string;
    img:            string;
    description:    string;
    description_ar: string;
    type:           string;
    mainDish:       IDish;
    sideDish:       IDish;
}

export interface IDish {
    name:      string;
    name_ar:   string;
    max_meal: number;
    unit:      string;
    calories:  number;
    carb:      number;
    protein:   number;
    fat:       number;
    kilj:      number;
    max_side: number;
}

export interface ICards {
    date: string;
    day: string;
    meals: any[];
    snacks: any[];
}