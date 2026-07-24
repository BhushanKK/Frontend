export interface StateTranslation {
    stateTranslationId: number;
    stateId: number;
    languageCode: string;
    stateName: string;
}

export interface State {
    stateId: number;
    stateName: string;
    isActive: boolean;
    translations: StateTranslation[];
}

export interface StateResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: State[];
}

export interface StateFormValues {
    stateName: string;
    isActive: boolean;
    translations: StateTranslationForm[];
}

export interface StateTranslationForm {
    languageCode: string;
    stateName: string;
}

export interface StateDropdown {
    stateId: number;
    stateName: string;
}