export const NutritionComponent = ({ label, quantity, unit }) => {
    return (
        <div>
            <p>{label} - {quantity.toFixed()} {unit}</p>
        </div>
    )
}