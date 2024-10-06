export function gql(strings: TemplateStringsArray, ...values: any[]): string {
    return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}