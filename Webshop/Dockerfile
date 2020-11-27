FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 44308

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Webshop.csproj", "./"]
RUN dotnet restore "Webshop.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Webshop.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Webshop.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Webshop.dll"]
