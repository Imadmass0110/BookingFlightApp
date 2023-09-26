#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app

# Set the ASPNETCORE_URLS environment variable to specify the desired port
ENV ASPNETCORE_URLS http://+:5000

EXPOSE 5000
EXPOSE 443

# Copy the database file into the image
COPY ["flightbooking.db", "/app/"]

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["FlightBookingAPI.csproj", "."]
RUN dotnet restore "./FlightBookingAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "FlightBookingAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FlightBookingAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FlightBookingAPI.dll"]