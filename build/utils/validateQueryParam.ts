export default function validateQueryParam(value : string | undefined): boolean {
    return value !== undefined && value !== null && value !== 'undefined' && value !== 'null' && value.trim() !== '';
}